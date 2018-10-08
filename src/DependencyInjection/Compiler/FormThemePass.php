<?php
namespace Netliva\MediaLibBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class FormThemePass implements CompilerPassInterface
{
	/**
	 * {@inheritdoc}
	 */
	public function process(ContainerBuilder $container)
	{
		$resources = $container->getParameter('twig.form.resources');
		$formResources = ["@NetlivaMediaLib/Form/theme.html.twig"];

		$container->setParameter('twig.form.resources', array_merge($resources, $formResources));
	}
}