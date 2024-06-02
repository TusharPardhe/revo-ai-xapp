import { Preferences } from '@capacitor/preferences';

export async function setObjectInAppStorage(key: string, data: Object | string): Promise<void> {
    if (typeof data === 'string') {
        await Preferences.set({
            key,
            value: data,
        });
        return;
    }

    await Preferences.set({
        key,
        value: JSON.stringify(data),
    });
}

export async function getObjectFromAppStorage(key: string): Promise<Object | null | string> {
    const storedValue = await Preferences.get({ key });

    if (!storedValue.value) {
        return null;
    }

    if (storedValue.value.startsWith('{') || storedValue.value.startsWith('[')) {
        return JSON.parse(storedValue.value);
    }

    return storedValue.value;
}
