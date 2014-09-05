<?php
// src/Acme/UserBundle/Entity/User.php

namespace scriptorium\UserScriptBundle\Entity;

use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 * @UniqueEntity(fields="email", message="Email already taken")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="registration_date", type="datetime")
     */
    protected $registrationDate;
    
    public function __construct()
    {
        parent::__construct();
        // your own logic
    }
}
