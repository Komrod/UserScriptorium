<?php

namespace scriptorium\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ScriptController extends Controller
{
    public function formAction()
    {
        return $this->render('scriptoriumUserBundle:script:form.html.twig');
    }
}
