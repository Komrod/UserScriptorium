<?php

namespace scriptorium\UserBundle\Entity;

use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
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
        
        // default registration date
        $this->registrationDate = new \DateTime();
    }

    /**
     * Get id
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }
    
    public function hasName()
    {
        return false;
    }

    /**
     * Get registrationDate
     * @return string
     */
    public function getRegistrationDate()
    {
        return $this->registrationDate;
    }
    
    /**
     * Set registrationDate
     * @param $date DateTime The registration date
     */
    public function setRegistrationDate($date)
    {
        $this->registrationDate = $date;
    }
    
}
