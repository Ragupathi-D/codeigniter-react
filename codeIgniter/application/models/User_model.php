<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {

    const TABLE = 'users';

    public function get_by_email($email) {
        $query = $this->db->get_where(self::TABLE, ['email' => $email], 1);
        return $query->row();
    }

    public function get_by_id($id) {
        $query = $this->db->get_where(self::TABLE, ['id' => (int)$id], 1);
        return $query->row();
    }

    public function create($username, $email, $plain_password) {
        $data = [
            'username'   => $username,
            'email'      => $email,
            'password'   => password_hash($plain_password, PASSWORD_BCRYPT),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ];
        $this->db->insert(self::TABLE, $data);
        return $this->db->insert_id() ?: FALSE;
    }

    public function verify_password($plain, $hashed) {
        return password_verify($plain, $hashed);
    }
}
