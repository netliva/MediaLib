<?php
namespace Netliva\MediaLibBundle;


use Netliva\MediaLibBundle\DependencyInjection\Compiler\FormThemePass;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class NetlivaMediaLibBundle extends Bundle
{
	/**
	 * @param \Symfony\Component\DependencyInjection\ContainerBuilder $container
	 */
	public function build(ContainerBuilder $container)
	{
		parent::build($container);
		$container->addCompilerPass(new FormThemePass());
	}

}