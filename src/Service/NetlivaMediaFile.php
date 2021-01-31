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

	public function __construct () {}


	public function __toString ()
	{
		return (string) json_encode([$this->getEntity()->getId() => parent::__toString()]);
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

	public function setVars(NetlivaFile $fileInfo)
	{
		$this->setSubfolder($fileInfo->getSubfolder());
		$this->setPath($fileInfo->getPath());
		$this->setFilename($fileInfo->getFilename());
	}

}
