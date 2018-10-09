if (window.jQuery)
{
	(function ($) {

		$.nmlb = {
			// ===============
			modal: null,
			selectedMedias: {},

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

					toolbarLeft.appendTo(toolbar.find(".nmlb-toolbar"));
					toolbarRight.appendTo(toolbar.find(".nmlb-toolbar"));
					this.modal.prependTo(container);
					close_btn.prependTo(this.modal);
					title.appendTo(this.modal);
					router.appendTo(this.modal);
					content.appendTo(this.modal);
					toolbar.appendTo(this.modal);


					router.find("li").click($.proxy(this.route,this));
					close_btn.click(function(){$("#netlivaMediaModal").hide();});

					$("body").append(container);
				}
				else
				{
					$("#netlivaMediaModal").show();
					this.modal = $("#netlivaMediaModal .nmlb-modal")
				}

				this.modal.find('.nmlb-frame-router li[data-href="browser"]').click();

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
				var upload = $("<div>upload</div>");
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


				for (var i = 0; i < 15; i++) {
					this.new_attachment(i);
				}

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
			new_attachment: function (id)
			{
				var attachments = this.modal.find('.nmlb-browser .nmlb-attachments');

				var attachment = this.prepare_attachment({
					id: id,
					url: "http://www.bilalyilmaz.com/files/yuklemeler/2016/11/logo-1-100x94.png",
				});

				attachment.appendTo(attachments);
			},
			select_attachment : function (e)
			{
				console.log("select");
				var $el = $(e.currentTarget).parent();

				if (!this.selectedMedias.hasOwnProperty($el.data("id"))) this.selectedMedias[$el.data("id")] = {"url":$el.find("img").attr("src")}
				this.update_selection();

				this.modal.find('.nmlb-attachment:not(*[data-id="'+$el.data("id")+'"])').removeClass("active");
				this.modal.find('.nmlb-attachment[data-id="'+$el.data("id")+'"]').addClass("active");
				this.modal.find('.nmlb-attachment[data-id="'+$el.data("id")+'"]').addClass("selected");
			},
			deselect_attachment : function (e)
			{
				console.log("deselect");
				var $el = $(e.currentTarget).parent();

				if (this.selectedMedias.hasOwnProperty($el.data("id"))) delete(this.selectedMedias[$el.data("id")]);
				this.update_selection();

				this.modal.find('.nmlb-attachment[data-id="'+$el.data("id")+'"]').removeClass("active");
				this.modal.find('.nmlb-attachment[data-id="'+$el.data("id")+'"]').removeClass("selected");
			},
			clear_selections : function () {
				this.selectedMedias = {}
				this.update_selection();
				this.modal.find('.nmlb-attachment').removeClass("active");
				this.modal.find('.nmlb-attachment').removeClass("selected");
			},
			update_selection : function () {
				console.log(this.selectedMedias);
				console.log(this.size(this.selectedMedias));
				selection = this.modal.find(".nmlb-frame-toolbar .nmlb-selection");
				if (this.size(this.selectedMedias))
				{
					selection.removeClass("empty");
					selection.find(".nmlb-count").text(this.size(this.selectedMedias)+" "+this.l.selected);
					attachments = selection.find(".nmlb-attachments");
					attachments.html("");
					var that = this;
					$.each(this.selectedMedias, function (key, val) {
						var attachment = that.prepare_attachment({
							class: "selection",
							id: key,
							url: "http://www.bilalyilmaz.com/files/yuklemeler/2016/11/logo-1-100x94.png",
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