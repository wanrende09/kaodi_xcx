import $mAssetsPath from './assets.config';
import $mConstDataConfig from './constData.config';

class Setting {
	constructor(
		appName, // 应用名称
		styleType, // 加载类型
		isOpenTakeOut, // 是否开启外卖
		isOpenArrive, // 是否开启到店
	) {
		this._appName = appName; // 应用名称
		this._styleType = styleType; // 加载类型
		this._isOpenTakeOut = isOpenTakeOut; // 是否开启外卖
		this._isOpenArrive = isOpenArrive; // 是否开启到店
	} 

	get appName() {
		return this._appName;
	}

	set appName(value) {
		this._appName = value;
	}

	get styleType() {
		return this._styleType;
	}

	set styleType(value) {
		this._styleType = value;
	}

	get isOpenTakeOut() {
		return this._isOpenTakeOut;
	}

	set isOpenTakeOut(value) {
		this._isOpenTakeOut = value;
	}

	get isOpenArrive() {
		return this._isOpenArrive;
	}

	set isOpenArrive(value) {
		this._isOpenArrive = value;
	}
}

export default new Setting(
	$mConstDataConfig.appName, // 应用名称
	'rf', // 商城主题
	true, // 是否开启外卖
	true, // 是否开启到店
)
