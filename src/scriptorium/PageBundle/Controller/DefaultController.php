<?php

namespace scriptorium\PageBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('scriptoriumPageBundle:home:index.html.twig');
    }
}
