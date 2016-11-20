export class Subcategory {
    public subcategoryId: number;
    public name: string;
    public refCategory: number;

    constructor(id: number, name: string, categoryId: number) {
        this.subcategoryId = id;
        this.name = name;
        this.refCategory = categoryId;
    }
}
