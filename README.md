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

### Step 3: Database Yapısını Güncelleyin

```
php bin/console doctrine:schema:update --force
```

Assetleri Projeye Dahil Edin
----------------------------
### Install assets

Aşağıdaki komut ile assets'lerin kurulumunu gerçekleştirin

`$ php bin/console assets:install` 

Bu komut ile; `(Symfony >= 4.0)` *public/bundles/netlivamedialib* 
`(Symfony >= 3.3)` *web/bundles/netlivamedialib* klasörü içerisinde 
oluşan js ve css dosyalarını projenize dahil ediniz.

 Dosyaları aşağıdaki gibi assetic yardımıyla projeye dahil edebilirsiniz; 

```html
<link href="{{ asset('bundles/netlivamedialib/nmlb.css' }}" rel="stylesheet" type="text/css">
<script src="{{ asset('bundles/netlivamedialib/nmlb.js' }}"></script>
```

yada encore kullanarak projeye dahil edebilirsiniz;

```javascript
// assets/js/app.js
require('../../public/bundles/netlivamedialib/nmlb.css');
require('../../public/bundles/netlivamedialib/nmlb.js');
```
### Localization

Ortam kütüphanesini farklı bir dilde kullanmak için 
`bundles/netlivamedialib/localize` 
klasörü içindeki js dosyalarından gerekli olanı  projenize dahil 
ederek sağlayabilirsiniz.

Örneğin;
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
Yükleyeceğiniz dosyaların nereye yükleneceğini ve 
indirme linkinin neresi olacağını aşağıdaki kodları ayarlar dosyanıza ekleyerek
düzenleyebilirsiniz. Bu ayarlar opsiyonel olup varsayılan değerler 
aşağıdaki gibidir. 

```yaml
# Symfony >= 4.0. Create a dedicated netliva_config.yaml in config/packages with:
# Symfony >= 3.3. Add in your app/config/config.yml:

netliva_file_type:
    file_config:
        upload_dir: public/netliva_uploads
        download_uri: /uploads
```
* **upload_dir:** dosyalarınızın proje ana klasöründen itibaren nereye yükleneceğini tanımlamanızı sağlar.
* **download_uri:**  yüklenen dosyalarınızın hangi klasör altından indirileceğini gösteren sanal bir dizindir. 
Dosyalarınız gerçekte bu klasör altında yeralmaz sadece dosyanın görünen url'ini belirler. 
Eğer burada belirteceğiniz klasör gerçekte proje ana dizininde bulunursa görüntülemede sıkıntı çıkabilir.


Basic Usage
===========
Öncelikle `json_array` tipinde veritabanı alanınızı oluşturun.
Ardından bu alan için formtype'a aşağıdaki gibi tanımlamanızı ekleyin.

 
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
_Multiple true ise çoklu dosya seçimi yapabilirsiniz, eğer false ise tek dosya seçimi yapabilirsiniz._ 
 
### Kaydedilen verileri kullanma
 
#### Kaydedilen verileriniz çoklu ise
 
Kaydedilen tüm dosya bilgilerini `get_nl_mfolder()` twig fonksiyonu getirecektir. 
Gelen veriler içerisinden dosya yolunu almak için `nl_file_uri` twig filtresini kullanabilirsiniz.  
 
```twig
{% for image in get_nl_mfolder(entity.images).files %}
    <img src="{{ image|nl_file_uri }}" />
{% endfor %}
```

#### Kaydedilen verileriniz çoklu değil ise

Kaydedilen tekil dosya bilginizi çekmek için `get_nl_mfile()` twig fonksiyonunu kullanabilirsiniz.
Çektiğiniz veriler içerisinden dosya yolunu almak için `nl_file_uri` twig filtresini işinizi kolaylaştıracaktır.  

```twig
<img src="{{ get_nl_mfile(entity.image)|nl_file_uri }}" />
```
 