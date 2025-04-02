// サイドメニューとオーバーレイのON/OFF
function toggleSideMenu() {
    const sideMenu = document.querySelector('side-menu');
    const overlay = document.getElementById('overlay');

    if (sideMenu.classList.contains('open')) {
        // すでに開いている場合は、slide-out&fade-outで閉じる
        sideMenu.classList.remove('slide-in');
        sideMenu.classList.add('slide-out');
        overlay.classList.remove('fade-in');
        overlay.classList.add('fade-out');

        sideMenu.addEventListener('animationend', function handleMenuSlideOut() {
            sideMenu.classList.remove('open', 'slide-out');
            sideMenu.style.display = 'none';
            sideMenu.removeEventListener('animationend', handleMenuSlideOut);
        });
        overlay.addEventListener('animationend', function handleOverlayFadeOut() {
            overlay.style.display = 'none';
            overlay.classList.remove('fade-out');
            overlay.removeEventListener('animationend', handleOverlayFadeOut);
        });
    } else {
        // 開いていない場合は、displayをblockにしてslide-in&fade-inを実行
        sideMenu.style.display = 'block';
        overlay.style.display = 'block';

        // 強制再描画でクラス追加によるアニメーションを確実に実行
        void sideMenu.offsetWidth;
        void overlay.offsetWidth;

        sideMenu.classList.add('open', 'slide-in');
        overlay.classList.add('fade-in');

        sideMenu.addEventListener('animationend', function handleMenuSlideIn() {
            sideMenu.classList.remove('slide-in');
            sideMenu.removeEventListener('animationend', handleMenuSlideIn);
        });
        overlay.addEventListener('animationend', function handleOverlayFadeIn() {
            overlay.classList.remove('fade-in');
            overlay.removeEventListener('animationend', handleOverlayFadeIn);
        });
    }
}

// オーバーレイをクリックしたらメニューを閉じる
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    overlay.addEventListener('click', toggleSideMenu);
});

// 画面サイズが変わった場合のリセット処理（769px以上は常時表示に）
window.addEventListener('resize', function() {
    const sideMenu = document.querySelector('side-menu');
    const overlay = document.getElementById('overlay');
    if (window.innerWidth >= 769) {
        sideMenu.style.display = '';
        sideMenu.classList.remove('slide-in', 'slide-out');
        sideMenu.classList.add('open');
        overlay.style.display = 'none';
        overlay.classList.remove('fade-in', 'fade-out');
    } else {
        sideMenu.classList.remove('open', 'slide-in', 'slide-out');
        sideMenu.style.display = 'none';
        overlay.style.display = 'none';
        overlay.classList.remove('fade-in', 'fade-out');
    }
});
