<?php

namespace scriptorium\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class UserController extends Controller
{
    public function registerFormAction()
    {
        $securityContext = $this->container->get('security.context');
        if ($securityContext->isGranted('IS_AUTHENTICATED_REMEMBERED') || $securityContext->isGranted('IS_AUTHENTICATED_FULLY')) {
            $url = $this->generateUrl("/");
            die('redirect to : '.$url); // @TODO delete
            return $this->redirect($url);
        }        
        return $this->render('scriptoriumUserBundle:user:registerForm.html.twig');
    }
}
