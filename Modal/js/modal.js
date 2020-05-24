(function () {

    function Modal(modalId) {
        this.$modal = $('#' + modalId);
        this.$frame = this.$modal.find('.modal__frame');
        this.$loading = this.$modal.find('.modal__loading');
        this.$close = this.$modal.find('.modal__close');

        this.currentSceneNum = 0;
        this.sceneList = [];
        let _this = this;
        this.$frame
            .find('.modal__scene')
            .each(function () {
                _this.sceneList.push($(this));
            });
        this.numScenes = this.sceneList.length;

        this.$close.on('click', this.close.bind(this));

        this.init();
        $(window).on('resize', this.frameHeightAdjust.bind(this))
    }

    window.Modal = Modal;


    Modal.BOX_MARGIN = 20;
    Modal.event = {
        MODAL_OPEN: 'modalOpe',
        MODAL_CLOSE: 'modalClose',
        SCENE_CHANGE: 'sceneChange'
    }

    Modal.scrollDisable = scrollDisable;
    Modal.scrollEnable = scrollEnable;

    Modal.prototype['hasPrev'] = hasPrev;
    Modal.prototype['hasNext'] = hasNext;
    Modal.prototype['init'] = init;
    Modal.prototype['addEventListener'] = addEventListener;
    Modal.prototype['removeEventListener'] = removeEventListener;
    Modal.prototype['dispatchEvent'] = dispatchEvent;
    Modal.prototype['frameHeightAdjust'] = frameHeightAdjust;
    Modal.prototype['open'] = open;
    Modal.prototype['close'] = close;
    Modal.prototype['showLoading'] = showLoading;
    Modal.prototype['hideLoading'] = hideLoading;
    Modal.prototype['changeScene'] = changeScene;
    Modal.prototype['prevScene'] = prevScene;
    Modal.prototype['nextScene'] = nextScene;


    function scrollDisable() {
        let $win = $(window);

        $('body')
            .css({
                position: 'fixed',
                top: $win.scrollTop() * -1 + 'px',
                width: $win.width() + 'px',
                height: $win.height() + 'px'
            });
    }

    function scrollEnable() {
        let $body = $('body');
        let scrollY = parseInt($body.css('top')) * -1;

        $body
            .css({
                position: '',
                top: '',
                width: '',
                height: ''
            });

        $(window).scrollTop(scrollY);
    }

    function hasPrev() {
        return this.currentSceneNum - 1 >= 0;
    }

    function hasNext() {
        return this.currentSceneNum + 1 < this.numScenes;
    }

    function init() {
        this.$modal
            .addClass('isClose')
            .removeClass('isOpen')
            .removeClass('isAnimated')
            .removeClass('modal--openAnim')
            .removeClass('modal--closeAnim')
            .off('animationend webkitAnimationEnd');

        this.$loading
            .addClass('isHide')
            .removeClass('isShow');

        let i = this.numScenes;
        for (; i--;) {
            this.sceneList[i]
                .addClass('isHide')
                .removeClass('isShow')
                .removeClass('isAnimated')
                .removeClass('modal--transitionSceneAnim')
                .off('animationend webkitAnimationEnd');
        }

        this.currentSceneNum = 0;
        this.changeScene(0, true);
    }

    function addEventListener() {
    }

    function removeEventListener() {
    }

    function dispatchEvent() {
    }

    function frameHeightAdjust() {
        let winH = $(window).height();

        this.$frame
            .css({
                top: 'auto',
                height: 'auto',
                overflow: 'visible'
            });

        let frameH = this.$frame.outerHeight();

        if (frameH + Modal.BOX_MARGIN * 2 > winH) {
            this.$frame
                .css({
                    top: Modal.BOX_MARGIN + 'px',
                    height: winH - Modal.BOX_MARGIN * 2,
                    overflow: 'auto'
                });
        }

        this.$frame.scrollTop(0);
    }

    function open() {
        if (this.$modal.hasClass('isAnimated')) {
            return;
        }

        Modal.scrollDisable();

        let _this = this;

        this.$modal
            .on('animationend webkitAnimationEnd', function () {
                _this.$modal
                    .removeClass('modal--openAnim')
                    .removeClass('isAnimated')
                    .addClass('isOpen')
                    .off('animationend webkitAnimationEnd');
                _this.dispatchEvent(Modal.event.MODAL_OPEN);
            })
            .removeClass('isClose')
            .addClass('modal--openAnim')
            .addClass('isAnimated');

        this.frameHeightAdjust();
    }

    function close() {
        if (this.$modal.hasClass('isAnimated')) {
            return;
        }

        Modal.scrollEnable();

        let _this = this;

        this.$modal
            .on('animationend webkitAnimationEnd', function () {
                _this.$modal
                    .removeClass('modal--closeAnim')
                    .removeClass('isAnimated')
                    .addClass('isClose')
                    .off('animationend webkitAnimationEnd');

                _this.init();
                _this.dispatchEvent(Modal.event.MODAL_OPEN);
            })
            .removeClass('isOpen')
            .addClass('modal--closeAnim')
            .addClass('isAnimated');
    }

    function showLoading() {
        this.$loading
            .removeClass('isHide')
            .addClass('isShow');
    }

    function hideLoading() {
        this.$loading
            .removeClass('isShow')
            .addClass('isHide');
    }

    function changeScene(sceneNum, noAnimation) {
        let $scene = this.sceneList[sceneNum];

        if (!$scene || $scene.hasClass('isAnimated')) {
            return;
        }

        this.sceneList[this.currentSceneNum]
            .removeClass('isShow')
            .addClass('isHide');

        this.currentSceneNum = sceneNum;

        if (noAnimation) {
            $scene
                .removeClass('isHide')
                .addClass('isShow');

            this.frameHeightAdjust();
            this.dispatchEvent(Modal.event.SCENE_CHANGE);
        } else {
            let _this = this;

            $scene
                .on('animationend webkitAnimationEnd', function () {
                    $scene
                        .removeClass('modal--transitionSceneAnim')
                        .removeClass('isAnimated')
                        .addClass('isShow')
                        .off('animationend webkitAnimationEnd');

                    _this.dispatchEvent(Modal.event.SCENE_CHANGE);
                })
                .removeClass('isHide')
                .addClass('modal--transitionSceneAnim')
                .addClass('isAnimated');

            this.frameHeightAdjust();
        }
    }

    function prevScene(noAnimation) {
        if (this.hasPrev()) {
            this.changeScene(this.currentSceneNum - 1, noAnimation);
        }
    }

    function nextScene(noAnimation) {
        if (this.hasNext()) {
            this.changeScene(this.currentSceneNum + 1, noAnimation)
        }
    }
})();