<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model
{
    /**
     * Validate credentials and return the user row on success, FALSE otherwise.
     *
     * @param  string $username
     * @param  string $password  Plain-text password to verify against the stored hash.
     * @return object|false
     */
    public function login($username, $password)
    {
        $query = $this->db->get_where('users', ['username' => $username]);
        $user  = $query->row();

        if ($user && password_verify($password, $user->password)) {
            return $user;
        }

        return FALSE;
    }
}
