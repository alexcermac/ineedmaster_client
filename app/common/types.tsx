export interface Solution {
    id: number,
    userId: number,
    userFirstName: string,
    categoryId: number,
    categoryName: string,
    subcategoryId: number,
    subcategoryName: string,
    title: string,
    description: string,
    type: string,
    price: number,
    countyId: number,
    countyName: string,
    cityId: number,
    cityName: string,
    startHour: string,
    endHour: string
}

export interface User {
    email: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    phone: string,
    role: string
}

export interface Task {
    id: number,
    masterId: number,
    masterFirstName: string,

    solutionId: string,
    solutionCategoryName: string,
    solutionSubcategoryName: string,
    solutionTitle: string,
    solutionDescription: string,
    solutionType: string,
    solutionPrice: number,

    date: Date,
    startHour: string,
    endHour: string,
    status: string,
    address: string
}