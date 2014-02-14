enchant();

window.onload = function() {

	core = new Core(320, 320);
	core.fps = 16;
	// ゲームで使用するファイル読み込み
	core.preload('chara0.png', 'map2.png', 'clear.png');

	core.onload = function() {
		// バックグラウンドのスプライト作成
		var bg = new Sprite(320, 320);
		bg.backgroundColor = "#4abafa";
		// サーフィス作成
		var image = new Surface(320, 320);
		// map2.pngの(0, 0)の位置から縦横16ピクセル幅の領域を、
		// そのままのサイズで(0, 192)から(320, 192)の範囲に16ピクセル間隔で20個描画する
		for(var i = 0; i < 20; i++) {
			image.draw(core.assets['map2.png'], 0, 0, 16, 16, 16 * i, 16 * 12, 16, 16);
		}
		// サーフィスをスプライトの画像に設定
		bg.image = image;
		// バックグラウンドのtouchstartイベントリスナ
		bg.addEventListener('touchstart', function(e) {
			// プレイヤーの移動フラグをtrueにする
			player.moving = true;
		});
		// バックグラウンドのtouchendイベントリスナ
		bg.addEventListener('touchend', function(e) {
			// プレイヤーの移動フラグをfalseにする
			player.moving = false;
		});
		core.rootScene.addChild(bg);

		// プレイヤースプライト作成
	}
}