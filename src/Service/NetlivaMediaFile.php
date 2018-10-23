<?php
/**
 * Created by PhpStorm.
 * User: bilal
 * Date: 05.10.2018
 * Time: 08:18
 */

namespace Netliva\MediaLibBundle\Service;


use Netliva\FileTypeBundle\Service\NetlivaFile;
use Netliva\MediaLibBundle\Entity\Files;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Netliva\FileTypeBundle\Service\UploadHelperService;

class NetlivaMediaFile extends NetlivaFile implements \JsonSerializable
{

	/** @var Files */
	private $entity;

	public function __construct ($mediaId, UploadHelperService $uploadHelperService)
	{
		$media = $uploadHelperService->getMedia($mediaId);
		$this->setEntity($media);
		$path = $uploadHelperService->getFilePath($media->getFileInfo());

		$oriName = null;
		if (is_array($media->getFileInfo()) and key_exists("original_name",$media->getFileInfo()))
			$oriName = $media->getFileInfo()["original_name"];

		parent::__construct($path, $uploadHelperService, $oriName);
	}


	public function __toString ()
	{
		return (string) $this->getEntity()->getId();
	}

	public function jsonSerialize()
	{
		return parent::jsonSerialize() + [
			"mediaId"			=> $this->getEntity()->getId(),
			"mediaTitle"		=> $this->getEntity()->getTitle(),
			"mediaDescription"	=> $this->getEntity()->getDescription(),
			"mediaCaption" 		=> $this->getEntity()->getCaption(),
			"mediaAlt"			=> $this->getEntity()->getAlt(),
			"mediaAddAt"		=> $this->getEntity()->getAddAt(),
		];
	}


	/**
	 * @return Files
	 */
	public function getEntity (): Files
	{
		return $this->entity;
	}

	/**
	 * @param Files $entity
	 */
	public function setEntity (Files $entity): void
	{
		$this->entity = $entity;
	}


}