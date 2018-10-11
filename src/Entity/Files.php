<?php
namespace Netliva\MediaLibBundle\Entity;

/**
 * Class Files
 * @package Netliva\MediaLibBundle\Entity
 */
class Files
{
	/**
	 * @var integer
	 */
	private $id;
	/**
	 * @var string
	 */
	private $title;
	/**
	 * @var string | null
	 */
	private $caption;
	/**
	 * @var string | null
	 */
	private $alt;
	/**
	 * @var string | null
	 */
	private $description;
	/**
	 * @var \DateTime
	 */
	private $addAt;
	/**
	 * @var array
	 */
	private $fileInfo;

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

	/**
	 * @return \DateTimeInterface|null
	 */
	public function getAddAt(): ?\DateTimeInterface
    {
        return $this->addAt;
    }

	/**
	 * @param \DateTimeInterface $addAt
	 *
	 * @return Files
	 */
	public function setAddAt(\DateTimeInterface $addAt): self
    {
        $this->addAt = $addAt;

        return $this;
    }


}
