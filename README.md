netliva/medialib
============

This package adds media library functionality to Symfony Form

Installation
============

Applications that use Symfony Flex
----------------------------------

Open a command console, enter your project directory and execute:

```console
$ composer require netliva/medialib
```

Applications that don't use Symfony Flex
----------------------------------------

### Step 1: Download the Bundle

Open a command console, enter your project directory and execute the
following command to download the latest stable version of this bundle:

```console
$ composer require netliva/medialib
```

This command requires you to have Composer installed globally, as explained
in the [installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

### Step 2: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `app/AppKernel.php` file of your project:

_NetlivaFileTypeBundle has been installed as a dependency of NetlivaMediaLibBundle.
 If you have not installed **NetlivaFileTypeBundle** before,
 you must enable it because of the dependency._


```php
<?php
// app/AppKernel.php

// ...
class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            // ...
            new Netliva\MediaLibBundle\NetlivaMediaLibBundle(),
            new Netliva\FileTypeBundle\NetlivaFileTypeBundle(),
        );

        // ...
    }

    // ...
}
```

### Step 3: Update Database Schema

```
php bin/console doctrine:schema:update --force
```

Include Assets to Your Project
----------------------------
### Install assets

Install assets as shown below

`$ php bin/console assets:install` 

This command will create asset files in folders which; `(Symfony >= 4.0)` *public/bundles/netlivamedialib* 
`(Symfony >= 3.3)` *web/bundles/netlivamedialib* .

 Include files which created by assets command, into your project: 

```html
<link href="{{ asset('bundles/netlivamedialib/nmlb.css' }}" rel="stylesheet" type="text/css">
<script src="{{ asset('bundles/netlivamedialib/nmlb.js' }}"></script>
```

or using webpack encore;

```javascript
// assets/js/app.js
require('../../public/bundles/netlivamedialib/nmlb.css');
require('../../public/bundles/netlivamedialib/nmlb.js');
```
### Localization

To using MediaLib with different languages, include the js file to your project under  
`bundles/netlivamedialib/localize`.

For Example;
```html
<script src="{{ asset('bundles/netlivamedialib/localize/tr.js' }}"></script>
```

Configurations
==============

Routes Definations
------------------

```yaml
netliva_file_route:
  resource: .
  type: netliva_file_route
```

Config Definations
------------------
You can configure your upload folder or your download uri as shown below. This settings are optional and default values are shown below.

```yaml
# Symfony >= 4.0. Create a dedicated netliva_config.yaml in config/packages with:
# Symfony >= 3.3. Add in your app/config/config.yml:

netliva_file_type:
    file_config:
        upload_dir: public/netliva_uploads
        download_uri: /uploads
```
* **upload_dir:** This options sets where your files will be uploaded starts from project root directory.
* **download_uri:**  This option sets a virtual folder name where your folders will be downloaded from. If there is a folder with this name in your project root directory, it would cause error


Basic Usage
===========
Firstly add a field as `json` type in your entity.
Then simply add MediaLibType to your form with this field.

 
```php
<?php
//...
public function buildForm (FormBuilderInterface $formBuilder, array $options)
{
	//...
	$formBuilder->add('images', MediaLibType::class, [ 'label' => 'Images', 'button_text'=>"select file", 'multiple'=>"true"]);
	//...
}
//...
?>
```
_with Multiple true you can select multiple files, or with false it allows you to select one file only._ 
 
### Use inserted datas to field
 
#### If your data is multiple uploaded
 
`get_nl_mfolder()` twig function will return folder information from  field. 
You can use `nl_file_uri` twig filter to get file path from field.  
 
```twig
{% for image in get_nl_mfolder(entity.images).files %}
    <img src="{{ image|nl_file_uri }}" />
{% endfor %}
```

#### If your data is single file uploaded

`get_nl_mfile()` twig function will return file information from field.
You can use `nl_file_uri` twig filter to get file path from field.  

```twig
<img src="{{ get_nl_mfile(entity.image)|nl_file_uri }}" />
```
 
