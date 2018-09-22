<?php
namespace App\Netliva\ImageLibBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ImageLibType extends AbstractType
{

	public function buildForm (FormBuilderInterface $builder, array $options)
	{
	}

	public function buildView (FormView $view, FormInterface $form, array $options)
	{
		$view->vars['multiple'] = $options['multiple'];
	}

	public function configureOptions (OptionsResolver $resolver)
	{
		$resolver->setDefaults([
			'multiple'	=> false,
		]);	}

	public function getBlockPrefix ()
	{
		return 'netliva_image_lib';
	}

	public function getParent ()
	{
		return HiddenType::class;
	}
}