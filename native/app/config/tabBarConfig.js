
const tabBarConfig = {
    items: [
        {
            id: 'shop',
            title: 'Shop',
            imageUrl: 'file:///wand.png',
            selectedImageUrl: 'file:///wand.png',
            rootUrl: 'https://www.merlinspotions.com',
            isInitialTab: true
        },
        {
            id: 'stores',
            title: 'Stores',
            imageUrl: 'file:///map.png',
            selectedImageUrl: 'file:///map.png',
            rootUrl: 'https://www.merlinspotions.com'
        },
        {
            id: 'account',
            title: 'Account',
            imageUrl: 'file:///user.png',
            selectedImageUrl: 'file:///user.png',
            rootUrl: 'https://www.merlinspotions.com/customer/account/login/'
        },
        {
            id: 'more',
            title: 'More',
            imageUrl: 'file:///more.png',
            selectedImageUrl: 'file:///more.png',
            rootUrl: 'https://www.merlinspotions.com'
        }
    ]
}

const getInitialTabId = function() {
    const initialTabItem = tabBarConfig.items.find((item) => {
        return typeof item.isInitialTab === 'boolean' && item.isInitialTab
    })

    if (initialTabItem) {
        return initialTabItem.id
    }

    return undefined
}

export {tabBarConfig, getInitialTabId}
