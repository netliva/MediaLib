<?php
namespace Netliva\MediaLibBundle\Entity;

/**
 * Class Files
 * @package Netliva\MediaLibBundle\Entity
 */
class Files
{
	private int $id;
	private string $title;
	private ?string $caption;
	private ?string $alt;
	private ?string $description;
	private \DateTime $addAt;
	private array $fileInfo;

	/**
	 * @return int|null
	 */
	public function getId(): ?int
    {
        return $this->id;
    }

	/**
	 * @return array
	 */
	public function getFileInfo()
    {
        return $this->fileInfo;
    }

	/**
	 * @param $fileInfo
	 *
	 * @return Files
	 */
	public function setFileInfo($fileInfo): self
    {
        $this->fileInfo = $fileInfo;

        return $this;
    }

	/**
	 * @return null|string
	 */
	public function getTitle(): ?string
    {
        return $this->title;
    }

	/**
	 * @param string $title
	 *
	 * @return Files
	 */
	public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

	/**
	 * @return null|string
	 */
	public function getCaption(): ?string
    {
        return $this->caption;
    }

	/**
	 * @param null|string $caption
	 *
	 * @return Files
	 */
	public function setCaption(?string $caption): self
    {
        $this->caption = $caption;

        return $this;
    }

	/**
	 * @return null|string
	 */
	public function getAlt(): ?string
    {
        return $this->alt;
    }

	/**
	 * @param null|string $alt
	 *
	 * @return Files
	 */
	public function setAlt(?string $alt): self
    {
        $this->alt = $alt;

        return $this;
    }

	/**
	 * @return null|string
	 */
	public function getDescription(): ?string
    {
        return $this->description;
    }

	/**
	 * @param null|string $description
	 *
	 * @return Files
	 */
	public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }


	public function getAddAt(): ?\DateTime
    {
        return $this->addAt;
    }


	public function setAddAt(\DateTime $addAt): self
    {
        $this->addAt = $addAt;

        return $this;
    }


}
