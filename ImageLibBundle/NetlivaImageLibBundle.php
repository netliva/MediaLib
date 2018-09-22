<?php
namespace App\Netliva\ImageLibBundle;


use App\Netliva\ImageLibBundle\DependencyInjection\Compiler\FormThemePass;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class NetlivaImageLibBundle extends Bundle
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