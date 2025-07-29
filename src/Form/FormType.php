<?php

namespace Netliva\MediaLibBundle\Form;

use Netliva\FileTypeBundle\Form\Type\NetlivaFileType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nmlb-file', NetlivaFileType::class, ["multiple"=>true])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
			'csrf_protection'   => false
        ]);
    }

	public function getBlockPrefix (): string
	{
		return "nmlb_form";
	}


}
