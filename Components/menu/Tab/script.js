const img = [ './img/' ];
class Tab {
	constructor (tab, { tiggerType = 'click', effect = 'fade', invoke = 0, auto = 0 } = {}) {
		/**
		 * @param {HTMLElement} tab
		 */
		this.tab = tab;
		this.nav = tab.querySelector('.tab-nav');
		this.top = 0;

		console.log(this.nav);
		this.nav.onclick = this.switchTab;

		this.tabItem = [ ...tab.querySelectorAll('.tab .tab-nav-item') ];
		this.contentItem = [ ...tab.querySelectorAll('.tab .tab-content > *') ];
		// tabItems = tab.
		/**
		 * 面试的时候不要写
		 * @param {string} triggerType  default resent tab 
		 * @param {string} invoke  default resent tab 
		 */

		this.triggerType = tiggerType;
		this.effect = effect;
		this.auto = auto;
		if ('fade' == this.effect) {
			this.contentItem.forEach((e) => (e.style.transition = 'opacity 0.3s'));
		}
		this.invoke(this.top);
	}

	// have to be the ()=>
	switchTab = (e) => {
		var self = this;

		let tab = e.target;
		if (tab.className != 'tab-nav-item') tab = tab.parentElement;
		let tabNum = parseInt(tab.getAttribute('data-value'));
		// alert(tabNum);
		console.log('tabNum', tabNum);
		console.log('top', this.top);
		console.log('this.contentItem', self.contentItem[3]);

		if (tabNum !== this.top) {
			self.contentItem[tabNum].classList.add('active');
			self.contentItem[this.top].classList.remove('active');

			self.top = tabNum;
		}
	};

	invoke = (top) => {
		this.contentItem[top].style.opacity = 1;
	};

	/**
	 * 
	 */
}

let tab = new Tab(document.querySelector('.tab'), {
	triggerType : 'tap'
});
