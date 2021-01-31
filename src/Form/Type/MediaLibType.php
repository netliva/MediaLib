<?php
namespace Netliva\MediaLibBundle\Form\Type;

use Netliva\FileTypeBundle\Service\NetlivaFolder;
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
	private $uhs;
	public function __construct (UploadHelperService $uploadHelperService) {

		$this->uhs = $uploadHelperService;
	}

	public function buildForm (FormBuilderInterface $builder, array $options)
	{
		// DB'den veriyi çekerken
		$getDataFromModel = function ($data) use ($builder, $options)
		{
			if ($options['multiple'])
				return $this->uhs->getNetlivaMediaFolder($data);

			return $this->uhs->getNetlivaMediaFile($data);

		};

		// Veriyi Forma Eklerken
		$setDataToView = function($data) use ($builder, $options)
		{
			// if (is_array($data)) return null;
			dump('Forma', $data);

			if (is_string($data))
			{
				if ($options['multiple'])
					return $this->uhs->getNetlivaMediaFolder($data);

				return $this->uhs->getNetlivaMediaFile($data);
			}

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
			if ($options['multiple'])
			{
				$dir =  $this->uhs->getNetlivaMediaFolder($data);

				if ($options['return_data_type'] == 'string') return $dir->__toString();

				if ($options['return_data_type'] == 'array') return $dir->jsonSerialize();

				return $dir;
			}

			if (is_string($data))
				$data = @json_decode($data, true);

			if (!is_array($data) || !count($data)) return null;

			$file = $this->uhs->getNetlivaMediaFile(array_keys((array)$data)[0]);

			if ($options['return_data_type'] == 'string') return $file->__toString();

			if ($options['return_data_type'] == 'array') return $file->jsonSerialize();

			return $file;
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
		   'multiple'         => true,
		   'button_text'      => "Select",
		   'return_data_type' => "array",
		]);
	}

	public function getBlockPrefix ()
	{
		return 'netliva_media_lib';
	}

	public function getParent ()
	{
		return TextType::class;
	}

}
