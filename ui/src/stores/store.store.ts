
const useStoreStore = defineStore('store', () => {
    const isLoaded = ref(false);

    const loadStore = async () => {
        // 检查本地商店数据文件状态，不存在或过期则下载新的数据文件
        // 下载商店数据文件
        // 对商店数据文件进行解析处理，并存入sqlite数据库，编制索引
        // await PyAPI.loadStore()
        isLoaded.value = true;
    }

    return {
        isLoaded,
        loadStore
    }

})

export default useStoreStore;