interface ResponseData<T> {
    code: number,
    status: number,
    message: string,
    data: T
}

export default ResponseData;