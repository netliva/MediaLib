if (window.jQuery)
{
	(function ($) {

		$.nmlb = {
			// ===============
			modal				: null,
			selected_medias		: {},
			dropped_files		: [],
			file_input_name		: "nmlb_form[nmlb-file][]",
			is_uploading		: false,
			upload_url			: "/netliva/file/upload",
			file_list_url		: "/netliva/file/list",
			is_advanced_upload	: function() {
				var div = document.createElement('div');
				return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
			}(),
			// === LANGUAGE ===
			lang: "en",
			langs: {},
			l:{
				main_title		: "Ortam Ekle",
				upload_title	: "Dosya Yükle",
				explore_title	: "Ortam Kütüphanesi",
				search_input_ph	: "Ortam dosyalarında ara...",
				selected		: "seçildi",
				clear			: "Temizle",
				upload_area_msg	: "Yüklemek için dosyaları sürükleyip bırakın",
			},

			// === FUNCTIONS ===
			netlivaMediaLib: function ()
			{
				this.buildMediaModal();
			},
			buildMediaModal: function  ()
			{
				this.readLang();

				if (!$("#netlivaMediaModal").length)
				{
					this.modal = $('<div class="nmlb-modal"></div>');
					var container = $('<div id="netlivaMediaModal"><div class="nmlb-modal-back"></div></div>');
					var close_btn = $('<button class="nmlb-modal-close"><i class="nmlb-icon"></i></button>')
					var title = $('<div class="nmlb-frame-title"><h1>'+this.l.main_title+'</h1></div>');
					var router = $('<div class="nmlb-frame-router"><ul><li data-href="upload">'+this.l.upload_title+'</li><li data-href="browser">'+this.l.explore_title+'</li></ul></div>');
					var content = $('<div class="nmlb-frame-content"></div>');
					var toolbar = $('<div class="nmlb-frame-toolbar"><div class="nmlb-toolbar"></div></div>');
					var toolbarLeft = $('<div class="nmlb-toolbar-left"></div>');
					var toolbarRight = $('<div class="nmlb-toolbar-right"></div>');
					var uploader = $('<div class="nmlb-frame-uploader"><div class="nmlb-uploader-window"><div class="nmlb-uploader-window-content"><h1>'+this.l.upload_area_msg+'</h1></div></div></div>');
					var file = $('<div class="nmlb-frame-file"><input type="file" name="'+this.file_input_name+'" id="nmlb-file" multiple /></div>');

					toolbarLeft.appendTo(toolbar.find(".nmlb-toolbar"));
					toolbarRight.appendTo(toolbar.find(".nmlb-toolbar"));
					this.modal.prependTo(container);
					close_btn.prependTo(this.modal);
					title.appendTo(this.modal);
					router.appendTo(this.modal);
					content.appendTo(this.modal);
					toolbar.appendTo(this.modal);
					uploader.appendTo(this.modal);
					file.appendTo(this.modal);


					file.find("input").change($.proxy(this.upload,this));
					router.find("li").click($.proxy(this.route,this));
					close_btn.click($.proxy(this.close,this));

					$("body").append(container);
				}
				else
				{
					$("#netlivaMediaModal").show();
					this.modal = $("#netlivaMediaModal .nmlb-modal")
				}

				$(document).on("dragenter",$.proxy(this.dragenter,this));
				$(document).on("dragleave",$.proxy(this.dragleave,this));
				$(document).on("dragover",$.proxy(this.dragover,this));
				$(document).on("drop",$.proxy(this.drop,this));

				this.modal.find('.nmlb-frame-router li[data-href="browser"]').click();

			},
			close: function (e)
			{
				$("#netlivaMediaModal").hide();
				$(document).off("dragenter",$.proxy(this.dragenter,this));
				$(document).off("dragleave",$.proxy(this.dragleave,this));
				$(document).off("dragover",$.proxy(this.dragover,this));
				$(document).off("drop",$.proxy(this.drop,this));
			},
			dragenter: function (e)
			{
				e.preventDefault();
				if(e.relatedTarget == null )
				{
					var uploader = this.modal.find(".nmlb-frame-uploader .nmlb-uploader-window");
					uploader.show();
					setTimeout(function(){ uploader.css({opacity:1}); }, 10);
				}
			},
			dragleave: function (e)
			{
				e.preventDefault();
				if(e.relatedTarget == null)
				{
					var uploader = this.modal.find(".nmlb-frame-uploader .nmlb-uploader-window");
					uploader.css({opacity:0});
					setTimeout(function(){ if (uploader.css("opacity") == 0) uploader.hide(); }, 300);
				}
			},
			dragover: function (e)
			{
				e.preventDefault();
			},
			drop: function (e)
			{
				e.preventDefault();
				var dt = e.originalEvent.dataTransfer;
				var length = dt.items.length;
				for (var i = 0; i < length; i++) {
					var entry = dt.items[i].webkitGetAsEntry();
					console.log(entry);
					if (entry.isFile) {
						console.log("filee");
					} else if (entry.isDirectory) {
						console.log("directoryyy");
					}
				}

				this.dropped_files = e.originalEvent.dataTransfer.files;

				$(document).trigger("dragleave");

				this.upload();
			},
			route : function (e)
			{
				var $el = $(e.currentTarget);

				path = $el.data("href");
				$el.parent().find(">*").removeClass("active");
				$el.addClass("active");

				this.modal.find(".nmlb-frame-toolbar .nmlb-toolbar .nmlb-toolbar-left").html("");
				this.modal.find(".nmlb-frame-toolbar .nmlb-toolbar .nmlb-toolbar-right").html("");
				this["content_"+path]();
			},
			content_upload: function ()
			{
				var upload = $('<div class="box__input">' +
					'<label for="nmlb-file"><strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.</label><br>' +
					'<button class="box__button" type="submit">Upload</button>' +
				'</div>');
				this.modal.find(".nmlb-frame-content").html(upload);
			},
			content_browser: function ()
			{
				this.build_browser();

				var search = $('<input placeholder="'+this.l.search_input_ph+'" class="nmlb-browser-search" type="search" id="nmlb-media-search-input"></input>');
				var selection = $(
					'<div class="nmlb-selection">' +
						'<div class="nmlb-selection-info">' +
							'<span class="nmlb-count">1 seçildi</span>' +
							'<button type="button" class="nmlb-button-link nmlb-clear-selection">'+this.l.clear+'</button>' +
						'</div>' +
						'<div class="nmlb-selection-view">' +
							'<ul class="nmlb-attachments">' +
							'</ul>' +
						'</div>' +
					'</div>');


				selection.find(".nmlb-clear-selection").click($.proxy(this.clear_selections, this));
				search.appendTo(this.modal.find(".nmlb-browser-toolbar .nmlb-toolbar-right"));
				selection.appendTo(this.modal.find(".nmlb-frame-toolbar .nmlb-toolbar .nmlb-toolbar-left"));

				this.update_selection();

				this.file_list();

			},
			build_browser: function ()
			{
				var browser = $('<div class="nmlb-browser"></div>');
				var toolbar = $('<div class="nmlb-browser-toolbar"></div>');
				var attachments = $('<ul class="nmlb-attachments"></ul>');
				var sidebar = $('<div class="nmlb-sidebar"></div>');
				var toolbarLeft = $('<div class="nmlb-toolbar-left"></div>');
				var toolbarRight = $('<div class="nmlb-toolbar-right"></div>');

				toolbarLeft.appendTo(toolbar);
				toolbarRight.appendTo(toolbar);

				toolbar.appendTo(browser);
				attachments.appendTo(browser);
				sidebar.appendTo(browser);

				this.modal.find(".nmlb-frame-content").html(browser);

			},
			file_list: function ()
			{
				// listeyi temizle
				this.modal.find('.nmlb-browser .nmlb-attachments').html("");

				var that = this;
				$.ajax({
					url:this.file_list_url, data:{}, dataType: "json", type: "post",
					success: function (response) {
						$.each(response, function (key, data) {
							that.new_attachment(data);
						})
					}
				});
			},
			new_attachment: function (data)
			{
				var attachments = this.modal.find('.nmlb-browser .nmlb-attachments');

				var attachment = this.prepare_attachment({
					id: data.id,
					url: data.url,
				});

				attachment.appendTo(attachments);
			},
			select_attachment : function (e)
			{
				console.log("select");
				var $el = $(e.currentTarget).parent();

				if (!this.selected_medias.hasOwnProperty($el.data("id"))) this.selected_medias[$el.data("id")] = {"url":$el.find("img").attr("src")}
				this.update_selection();

				this.modal.find('.nmlb-attachment:not(*[data-id="'+$el.data("id")+'"])').removeClass("active");
				this.modal.find('.nmlb-attachment[data-id="'+$el.data("id")+'"]').addClass("active");
				this.modal.find('.nmlb-attachment[data-id="'+$el.data("id")+'"]').addClass("selected");
			},
			deselect_attachment : function (e)
			{
				console.log("deselect");
				var $el = $(e.currentTarget).parent();

				if (this.selected_medias.hasOwnProperty($el.data("id"))) delete(this.selected_medias[$el.data("id")]);
				this.update_selection();

				this.modal.find('.nmlb-attachment[data-id="'+$el.data("id")+'"]').removeClass("active");
				this.modal.find('.nmlb-attachment[data-id="'+$el.data("id")+'"]').removeClass("selected");
			},
			clear_selections : function () {
				this.selected_medias = {}
				this.update_selection();
				this.modal.find('.nmlb-attachment').removeClass("active");
				this.modal.find('.nmlb-attachment').removeClass("selected");
			},
			update_selection : function () {
				console.log(this.selected_medias);
				console.log(this.size(this.selected_medias));
				selection = this.modal.find(".nmlb-frame-toolbar .nmlb-selection");
				if (this.size(this.selected_medias))
				{
					selection.removeClass("empty");
					selection.find(".nmlb-count").text(this.size(this.selected_medias)+" "+this.l.selected);
					attachments = selection.find(".nmlb-attachments");
					attachments.html("");
					var that = this;
					$.each(this.selected_medias, function (key, val) {
						var attachment = that.prepare_attachment({
							class: "selection",
							id: key,
							url: val.url,
						});

						attachment.appendTo(attachments);
					})
				}
				else
				{
					selection.addClass("empty");
				}
			},
			prepare_attachment : function (data) {
				data = $.extend({"url":"", "id":"", "class":""}, data);
				var attachment = $('<li role="checkbox" aria-checked="true" class="nmlb-attachment '+data.class+'" data-id="'+data.id+'"></li>');
				var preview = $('<div class="nmlb-attachment-preview">' +
					'<div class="thumbnail">' +
					'<div class="centered">' +
					'<img src="'+data.url+'">' +
					'</div>' +
					'</div>' +
					'</div>');
				preview.click($.proxy(this.select_attachment, this));
				preview.appendTo(attachment);

				if (data.class != "selection")
				{
					var deselect = $('<button type="button" class="check"><span class="nmlb-icon"></span></button>');
					deselect.click($.proxy(this.deselect_attachment,this));
					deselect.appendTo(attachment);
				}

				return attachment;
			},
			upload : function ()
			{
				if (this.is_uploading) return false;

				if(this.is_advanced_upload)
				{
					var that = this;
					var ajaxData = new FormData();

					if (this.dropped_files) {
						$.each( this.dropped_files, function(i, file) {
							console.log(file);
							ajaxData.append( that.file_input_name, file );
						});
					}

					$.ajax({
						url: this.upload_url,
						type: "post",
						data: ajaxData,
						dataType: 'json',
						cache: false,
						contentType: false,
						processData: false,
						complete: function() {
							that.is_uploading = false;
							that.file_list();
						},
						success: function(data) {

						},
						error: function() {
							// Log the error, show an alert, whatever works for you
						}
					});
				}
				else
				{
					var iframeName  = 'uploadiframe' + new Date().getTime();
					$iframe   = $('<iframe name="' + iframeName + '" style=""></iframe>');

					$form = $("<form />");
					$form.attr('target', iframeName);
					$form.attr('method', "post");
					$form.attr('enctype', "multipart/form-data");
					$form.attr('action', this.upload_url);
					this.modal.find('input[name="'+this.file_input_name+'"]').clone().appendTo($form);

					$('body').append($form);
					$('body').append($iframe);

					$form.submit();


					console.log($iframe);
					$iframe.one('load', function() {
						console.log("sss");
						console.log($iframe.contents().find('body').text());
						/*
						var data = JSON.parse($iframe.contents().find('body').text());
						if (!data.success) $errorMsg.text(data.error);
						*/
						$iframe.remove();
						$form.remove();
					});
				}
			},
			readLang : function () {
				if (this.langs[this.lang] != undefined)
					$.extend( true, this.l, this.langs[this.lang]);
			},
			size : function(obj) {
				var size = 0, key;
				for (key in obj) {
					if (obj.hasOwnProperty(key)) size++;
				}
				return size;
			}
		};

		$.fn.openNetlivaMediaLib = function(settings)
		{
			this.click(function(){
				settings = $.extend({
				}, settings);
				$.nmlb.netlivaMediaLib(settings);
				return false;
			});
		};

	})(jQuery);


}