if (window.jQuery)
{
	(function ($) {
		$.fn.openNetlivaMediaLib = function(settings)
		{
			this.click(function(){
				settings = $.extend({
				}, settings);
				netlivaMediaLib(settings);
				return false;
			});
		};

		function netlivaMediaLib ()
		{

		}

		function buildMediaModal ()
		{

		}

	})(jQuery);


}