<?php

namespace scriptorium\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class UserController extends Controller
{
    /*
    public function registerFormAction()
    {
        $securityContext = $this->container->get('security.context');
        if ($securityContext->isGranted('IS_AUTHENTICATED_REMEMBERED') || $securityContext->isGranted('IS_AUTHENTICATED_FULLY')) {
            // $url = $this->generateUrl("/");
            return $this->redirect("/");
        }        
        return $this->render('scriptoriumUserBundle:user:registerForm.html.twig');
    }
    */
    public function pictureAction()
    {
        $securityContext = $this->container->get('security.context');
        $user = $securityContext->getToken()->getUser();
        if (!is_object($user) || !$securityContext->isGranted('IS_AUTHENTICATED_REMEMBERED') && !$securityContext->isGranted('IS_AUTHENTICATED_FULLY')) {
            //$url = $this->generateUrl("/");
            // @TODO redirect after login
            return $this->redirect("/");
        } 
        
        $form = $this->createFormBuilder($user)
            ->add('profilePictureFile', 'file', array(
                    'required' => true,
                    'attr' => array(
                            'class' => 'form-file-input',
                    )
            )
        )
            ->add('profile.btn.upload', 'submit')
            ->getForm();
        
        if ($this->getRequest()->isMethod('POST')) {
            // @TODO post form
            exit;
        }
        
        return $this->render('scriptoriumUserBundle:user:pictureForm.html.twig', array(
            'form' => $form->createView(),
        ));
    }
}
