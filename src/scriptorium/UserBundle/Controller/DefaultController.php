<?php

namespace scriptorium\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('scriptoriumUserBundle:home:index.html.twig');
    }
    
    public function helloAction($name)
    {
        return $this->render('scriptoriumUserBundle:Default:index.html.twig', array('name' => $name));
    }
}
