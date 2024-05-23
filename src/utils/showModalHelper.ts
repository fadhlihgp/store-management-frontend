export const showOrCloseModal = (modalId: string, type: string) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        switch (type) {
            case 'show':
                (modal as HTMLFormElement).showModal();
                break;
            case 'close':
                (modal as HTMLFormElement).close();
                break;
            default: break;
        }

    }
}
