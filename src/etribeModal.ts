export class EtribeModal {
    /*
        iOpt {
            selector :  object,
            scrollLock : bool,
            useDimm : bool,
            dimmCss : string,
            selectDimm : object
        }
    */

    _body = document.querySelector('body');

    constructor (opt: iOpt) {
        opt.selector = opt.selector;
        opt.selector.classList.add('etribe-modal-center-wrap');

        let setScrollLock  = (opt.hasOwnProperty('scrollLock') && opt.scrollLock) ? true : false;
        let setUseDimm = (opt.hasOwnProperty('useDimm') && opt.useDimm == false) ? false : true;
        let setDimmCss = (opt.hasOwnProperty('dimmCss') && opt.dimmCss) ? true : false;
        let setSelectDimm = (opt.hasOwnProperty('selectDimm') && opt.selectDimm) ? true : false;
        let setHideOnClick = (opt.hasOwnProperty('hideOnClick') && opt.hideOnClick) ? true : false;

        this._center();
        window.addEventListener('resize', () => {
            let etribe_modal = <HTMLElement>document.querySelector('.etribe-modal-center-wrap');
            if(etribe_modal){
                this._center();
            }
        });

        if (setScrollLock) {
            this._scrollLockFunc(opt.selector);
        }

        if (setUseDimm) {
            this._setUseDimm();
        }

        if (setDimmCss && setUseDimm) {
            this._setDimmCss(opt.dimmCss);
        }

        if (setSelectDimm) {
            this._selectDimm(opt.selectDimm);
        }

        if (setHideOnClick) {
            this._hideOnClick();
        }
    }

    // hide Modal
    destroy () : void {
        let etribe_modal = <HTMLElement>document.querySelector('.etribe-modal-center-wrap');

        // modal hide
        etribe_modal.style.display = 'none';
        etribe_modal.classList.remove('etribe-modal-center-wrap');

        // scroll unlock 
        this._unbindEvent(etribe_modal, 'scroll touchmove mousewheel', this._eventBubbling);
        this._body.style.overflow = '';

        // hide select dimm
        this._hideDimm();

        // destroy create dimm
        this._destroyDimm();
    }

    // position center 
    protected _center () {
        let etribe_modal = <HTMLElement>document.querySelector('.etribe-modal-center-wrap');
        etribe_modal.style.cssText = etribe_modal.style.cssText + 'display:block; position:absolute';

        etribe_modal.style.top = Math.max(0, ((window.innerHeight - etribe_modal.clientHeight) / 2) + window.scrollY) + "px";
        etribe_modal.style.left = Math.max(0, ((window.innerWidth - etribe_modal.clientWidth) / 2) + window.scrollX) + "px";
    }

    // scroll Lock
    protected _scrollLockFunc (selector: HTMLElement) {
        this._bindEvent(selector, 'scroll touchmove mousewheel', this._eventBubbling);
        this._body.style.cssText = 'overflow:hidden'
    }

    protected _eventBubbling (e: Event) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    protected _bindEvent (el: Element, events: string, func: EventListener) {
        events.split(' ').forEach(function (evt) { // split 으로 잘린 문자열들이 evt에 담긴다
            el.addEventListener(evt, func);
        });
    }

    // scroll Unlock
    protected _unbindEvent (el: Element, events: string, func: EventListener) {
        events.split(' ').forEach(function (evt) {
            el.removeEventListener(evt, func);
        });
    }

    // use Dimm
    protected _setUseDimm () {
        let _dimDiv = this._createDiv('<div class="etribe-modal-dimm" style="width: 100%; height:100%; display:block; position: absolute; z-index: 99; top: 0; left: 0; background-color:black; opacity:0.6 "></div>');
        let _dimm = <HTMLElement>document.querySelector('.etribe-modal-dimm');

        if (!_dimm) {
            this._body.appendChild(_dimDiv);
        }
    }

    // Dimm css
    protected _setDimmCss (dimmCss: string) {
        let _dimm = <HTMLElement>document.querySelector('.etribe-modal-dimm');

        _dimm.style.cssText = _dimm.style.cssText + ';' + dimmCss;
    }

    protected _createDiv (dimm:string) {
        let _emptyDiv = document.createElement('div');
        
        _emptyDiv.innerHTML = dimm;
        return _emptyDiv.firstChild;
    }

    // select Dimm
    protected _selectDimm (selectDimm: HTMLElement) {
        selectDimm.classList.add('etribe-modal-dimm-user');
        selectDimm.style.display = 'block';
    }

    // hide select Dimm
    protected _hideDimm () {
        let _userDimm = <HTMLElement>document.querySelector('.etribe-modal-dimm-user');
        if (_userDimm) {
            _userDimm.style.display = 'none';
            _userDimm.classList.remove('etribe-modal-dimm-user');
        }  
    }

    // destroy use Dimm
    protected _destroyDimm () {
        let _dimm = <HTMLElement>document.querySelector('.etribe-modal-dimm');

        if (_dimm) {
            _dimm.parentNode.removeChild(_dimm);
        } 
    }

    // hide modal after dimm click
    protected _hideOnClick () {
        let _dimm = <HTMLElement>document.querySelector('.etribe-modal-dimm');
        let _userDimm = <HTMLElement>document.querySelector('.etribe-modal-dimm-user');
        let _clickDimm = _dimm || _userDimm ;

        _clickDimm.addEventListener('click', () => {
            this.destroy();
        })
    }
}