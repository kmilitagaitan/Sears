/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'swordfish\'">' + entity + '</span>' + html;
	}
	var icons = {
			'sf-icon-star' : '&#x30;&#x2e;&#x30;',
			'sf-icon-star-2' : '&#x30;&#x2e;&#x35;',
			'sf-icon-star-3' : '&#x31;&#x2e;&#x30;',
			'sf-icon-qrcode' : '&#x71;&#x72;',
			'sf-icon-checkmark' : '&#x2f;',
			'sf-icon-check-alt' : '&#x2f;&#x2f;',
			'sf-icon-x' : '&#x78;',
			'sf-icon-x-altx-alt' : '&#x78;&#x78;',
			'sf-icon-cog' : '&#x67;&#x32;',
			'sf-icon-arrow-d-small' : '&#x21;',
			'sf-icon-arrow-d' : '&#x22;',
			'sf-icon-arrow-l-small' : '&#x23;',
			'sf-icon-gifts' : '&#x24;',
			'sf-icon-zoom' : '&#x25;',
			'sf-icon-tags' : '&#x26;',
			'sf-icon-scan' : '&#x27;',
			'sf-icon-pin' : '&#x28;',
			'sf-icon-person' : '&#x29;',
			'sf-icon-balloon' : '&#x2a;',
			'sf-icon-barcode-fill' : '&#x2b;',
			'sf-icon-barcode' : '&#x2c;',
			'sf-icon-cart' : '&#x2d;',
			'sf-icon-bag' : '&#x2e;',
			'sf-icon-person-fill' : '&#x30;',
			'sf-icon-megaphone' : '&#x31;',
			'sf-icon-menu' : '&#x32;',
			'sf-icon-arrow-u' : '&#x33;',
			'sf-icon-arrow-u-small' : '&#x34;',
			'sf-icon-lists' : '&#x35;',
			'sf-icon-arrow-r' : '&#x36;',
			'sf-icon-house' : '&#x37;',
			'sf-icon-arrow-r-small' : '&#x38;',
			'sf-icon-arrow-l' : '&#x39;',
			'sf-icon-help' : '&#x3a;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/sf-icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};