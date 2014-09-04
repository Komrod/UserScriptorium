<?php

namespace scriptorium\UserScriptBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ScriptController extends Controller
{
    public function formAction()
    {
        return $this->render('scriptoriumUserScriptBundle:script:form.html.twig');
    }
}
