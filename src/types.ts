export type Tag = {
    id: string,
    title: string,
};

// used in local storage
export type RawNote = {
    id: string,
    title: string,
    body: string,
    tagsId: string[];
};

// used on note details page
export type Note = {
    id: string,
    title: string,
    body: string,
    tags: Tag[];
};

// used on note create page
export type SimpleNote = {
    title: string,
    body: string,
    tags: Tag[];
};