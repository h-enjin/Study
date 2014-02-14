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
		var player = new Sprite(32, 32);
		// サーフィスの作成
		var image = new Surface(96, 128);
		// chara0.pngの(0, 0)の位置から幅96ピクセル、高さ128ピクセルの領域を
		// (0, 0)の位置に幅96ピクセル、高さ128ピクセルで描画する
		image.draw(core.assets['chara0.png'], 0, 0, 96, 128, 0, 0, 96, 128);
		// サーフィスをスプライトの画像に設定
		player.image = image;
		// その他のプロパティの初期設定
		player.x = 16;		// x座標
		player.y = 16 * 10;	// y座標
		player.frame = 7;	// スプライトのフレーム番号
		player.vx = 2;		// 1フレームあたりの移動量
		player.moving = false;	// 移動フラグ
		// プレイヤーのenterframeイベントリスナ
		player.addEventListener('enterframe', function(e) {
			// プレイヤーの移動処理
			// 移動フラグがtrueだった時
			if(this.moving) {
				// vxプロパティの値ずつ移動
				this.x += this.vx;
				// 移動中は、フレーム番号を6、7、8と順に切り替えてアニメーションする
				this.frame = core.frame % 3 + 6;
				// NPCが振り向いたときの処理
				if(npc.frame == 4) {
					// プレイヤーを最初の場所に戻す
					this.x = 16;
					this.frame = 7;
				}
			}
			// ゲームクリア処理
			if(this.within(npc, 16)) {
				// プレイヤーとNPCの当たり判定を行い、プレイヤーとNPCのスプライトの中心距離が16ピクセル以下ならゲームクリアの画像を表示し終了
				core.end(null, null, core.assets['clear.png']);
			}
		});

		// プレイヤーのスプライトをrootSceneに追加して、スプライト表示
		core.rootScene.addChild(player);

		// NPCのスプライト作成
		var npc = new Sprite(32, 32);
		// サーフィスを作成
		var image = new Surface(96, 128);
		// chara0.pngの(192, 0)の位置から幅96ピクセル、高さ128ピクセルの領域を(0, 0)の位置に幅96ピクセル、高さ128ピクセルで描画
		image.draw(core.assets['chara0.png'], 192, 0, 96, 128, 0, 0, 96, 128);
		// サーフィスをスプライトの画像設定
		npc.image = image;
		// その他のプロパティの初期設定
		npc.x = core.width - 64;	// x座標
		npc.y = 16 * 10;			// y座標
		npc.frame = 7;				// フレーム番号
		// NPCのenterframeイベントリスナ
		npc.addEventListener('enterframe', function(e) {
			// 0から499の乱数を生成し、その値が10以下なら、NPCの向きを切り替える(フレーム番号を7から4、または4から7に切り替える)
			if(rand(500) < 10) this.frame = this.frame == 7 ? 4 : 7;
		});
		core.rootScene.addChild(npc);

		// 経過時間を表示するラベル生成
		var timeLabel = new TimeLabel(160, 0);
		core.rootScene.addChild(timeLabel);

	}
	core.start();
}