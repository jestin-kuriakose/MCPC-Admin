import {render, fireEvent, screen, renderHook, waitFor} from '@testing-library/react'
import Login from '../pages/Login'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import nock from 'nock';

const queryClient = new QueryClient()

const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

jest.mock("axios", ()=> ({
    __esModules: true,
    default: {
        get: () => ({
            data: {id:1, name:"John"}
        })
    }
}))

const expectation = nock('http://localhost:3000')
.post('/user/login', {
    email: "jestink@live.com", 
    password: "test"
})
.reply(200, {
    message: "Success"
});

test('Email input should be empty', () => { 
    render(<QueryClientProvider client={queryClient}><Login/></QueryClientProvider>)
    const emailInputEle = screen.getByPlaceholderText(/email address/i)

    expect(emailInputEle.value).toBe("");
 })

test("password input should be empty", () => {
    render(<QueryClientProvider client={queryClient}><Login/></QueryClientProvider>)
    const passInputEle = screen.getByPlaceholderText(/password/i)
    expect(passInputEle.value).toBe("")
})

test("Login button should be disabled", () => {
    render(<QueryClientProvider client={queryClient}><Login/></QueryClientProvider>)
    const buttonEle = screen.getByRole("button")
    expect(buttonEle).toBeDisabled()
})

test("Email input should change", () => {
    render(<QueryClientProvider client={queryClient}><Login/></QueryClientProvider>)
    const emailInputEle = screen.getByPlaceholderText(/email address/i)
    const testValue = "test"
    fireEvent.change(emailInputEle, { target: {value: testValue}})
    expect(emailInputEle.value).toBe(testValue)
})

test("Password input should change", () => {
    render(<QueryClientProvider client={queryClient}><Login/></QueryClientProvider>)
    const passInputEle = screen.getByPlaceholderText(/password/i)
    const testValue = "test"
    fireEvent.change(passInputEle, { target: {value: testValue}})
    expect(passInputEle.value).toBe(testValue)
})

// test("Button should not be disabled when input exists", ()=> {
//     render(<QueryClientProvider client={queryClient}><Login/></QueryClientProvider>)
//     const emailInputEle = screen.getByPlaceholderText(/email address/i)
//     const passInputEle = screen.getByPlaceholderText(/password/i)
//     const buttonEle = screen.getByRole("button")
//     const testValue = "test"
//     fireEvent.change(emailInputEle, {target: {value: testValue}})
//     fireEvent.change(passInputEle, {target: {value: testValue}})
//     expect(buttonEle).not.toBeDisabled()
// })

// test("Loading should be visible when button is pressed", async ()=> {
//     render(<QueryClientProvider client={queryClient}><Login/></QueryClientProvider>)
//     const emailInputEle = screen.getByPlaceholderText(/email address/i)
//     const passInputEle = screen.getByPlaceholderText(/password/i)
//     const buttonEle = screen.getByRole("button")
//     const testValue = "test"
//     fireEvent.change(emailInputEle, {target: {value: "jestink@live.com"}})
//     fireEvent.change(passInputEle, {target: {value: testValue}})
//     fireEvent.click(buttonEle);
//     await waitFor(() => expect(buttonEle).toHaveTextContent(/login/i))
// })

test('testing login post request', async ()=> {
    const expectation = nock('http://localhost:3000')
    .post('/user/login', {
        email: "jestink@live.com", 
        password: "test"
    })
    .reply(200, {
        message: "Success"
    });

    render(<QueryClientProvider client={queryClient}><Login/></QueryClientProvider>)
    const emailInputEle = screen.getByPlaceholderText(/email address/i)
    const passInputEle = screen.getByPlaceholderText(/password/i)
    const buttonEle = screen.getByRole("button")
    const testValue = "test"
    fireEvent.change(emailInputEle, {target: {value: "jestink@live.com"}})
    fireEvent.change(passInputEle, {target: {value: testValue}})
    fireEvent.click(buttonEle);
    // await waitFor(() => expect(buttonEle).not.toHaveTextContent(/login/i))
  
    const { result } = renderHook(() => useFetchData(), { wrapper });
  
  
  await waitFor(() => 
    expect(result.current.isSuccess).toEqual(true));
})