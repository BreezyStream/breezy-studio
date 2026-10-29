import Store from 'electron-store'

/**
 * @class Storage
 * @since 1.0.0
 */
export class Storage {

	/**
	 * @property store
	 * @since 1.0.0
	 * @hidden
	 */
	private static store: any = new Store()

	/**
	 * @method set
	 * @since 1.0.0
	 */
	public static set<T = any>(key: string, value: T) {
		this.store.set(key, value)
	}

	/**
	 * @method get
	 * @since 1.0.0
	 */
	public static get<T = any>(key: string): T | null {
		return this.store.get(key)
	}
}