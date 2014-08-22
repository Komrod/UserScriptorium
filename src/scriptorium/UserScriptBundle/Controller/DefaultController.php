<?php

namespace scriptorium\UserScriptBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('scriptoriumUserScriptBundle:home:index.html.twig');
    }
    
    public function helloAction($name)
    {
        return $this->render('scriptoriumUserScriptBundle:Default:index.html.twig', array('name' => $name));
    }
}
