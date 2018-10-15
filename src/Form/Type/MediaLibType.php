<?php
namespace Netliva\MediaLibBundle\Form\Type;

use Netliva\FileTypeBundle\Service\NetlivaDirectory;
use Netliva\FileTypeBundle\Service\UploadHelperService;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MediaLibType extends AbstractType
{
	private $uploadHelperService;
	public function __construct (UploadHelperService $uploadHelperService) {

		$this->uploadHelperService = $uploadHelperService;
	}

	public function buildForm (FormBuilderInterface $builder, array $options)
	{
		// DB'den veriyi çekerken
		$getDataFromModel = function ($data) use ($builder)
		{
			return $this->uploadHelperService->getNetlivaMediaFolder($data);
		};

		// Veriyi Forma Eklerken
		$setDataToView = function($data) use ($builder)
		{
			// if (is_array($data)) return null;
			return $data;
		};

		// Veriyi Formdan Alırken
		$getDataFromView = function($data) use ($builder)
		{
			return $data;
		};

		// DB'ye Kaydederken
		$setDataToModel = function ($data) use ($builder, $options)
		{
			return $this->uploadHelperService->getNetlivaMediaFolder($data);
		};


		$builder
			->addViewTransformer(new CallbackTransformer(
				$setDataToView, // Veriyi Forma Eklerken
				$getDataFromView  // Veriyi Formdan Alırken
			))
			->addModelTransformer(new CallbackTransformer(
				$getDataFromModel,  // DB'den veriyi çekerken
				$setDataToModel // DB'ye Kaydederken
			));
	}

	public function buildView (FormView $view, FormInterface $form, array $options)
	{
		$view->vars['multiple'] = $options['multiple'];
		$view->vars['button_text'] = $options['button_text'];
	}

	public function configureOptions (OptionsResolver $resolver)
	{
		$resolver->setDefaults([
			'multiple'		=> false,
			'button_text'	=> "Select",
		]);	}

	public function getBlockPrefix ()
	{
		return 'netliva_media_lib';
	}

	public function getParent ()
	{
		return TextType::class;
	}

}