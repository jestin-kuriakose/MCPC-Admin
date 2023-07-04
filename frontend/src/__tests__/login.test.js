import {render, fireEvent, screen, renderHook, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../pages/Login'
import { AuthProvider } from '../context/AuthProvider'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Loading from '../components/Loading'
import { Suspense } from 'react'

const MockLoginComponent = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        </AuthProvider>
    )
}

jest.mock("axios", () => ({
    __esModule: true,
    default: {
        get: () => ({
            data: { id:1, name: "jestin" }
        }),
        create: () => ({
            post:() => ({
                data: {
                    role: 2001,
                    accessToken: "asdjknkjnajsndaljs"
                }
            })
        })
    }
}))

describe("Login Component", () => {

    test('Email input should be empty', () => { 
        render(<MockLoginComponent/>)
        const emailInputEle = screen.getByPlaceholderText(/Email Address/i)
        expect(emailInputEle.value).toBe("");
     })
    
    test("password input should be empty", () => {
        render(<MockLoginComponent/>)
        const passInputEle = screen.getByPlaceholderText(/password/i)
        expect(passInputEle.value).toBe("")
    })
    
    test("Login button should be disabled", () => {
        render(<MockLoginComponent/>)
        const buttonEle = screen.getByRole("button")
        expect(buttonEle).toBeDisabled()
    })
    
    test("Email input should change", () => {
        render(<MockLoginComponent/>)
        const emailInputEle = screen.getByPlaceholderText(/email address/i)
        const testValue = "test"
        fireEvent.change(emailInputEle, { target: {value: testValue}})
        expect(emailInputEle.value).toBe(testValue)
    })
    
    test("Password input should change", () => {
        render(<MockLoginComponent/>)
        const passInputEle = screen.getByPlaceholderText(/password/i)
        const testValue = "test"
        fireEvent.change(passInputEle, { target: {value: testValue}})
        expect(passInputEle.value).toBe(testValue)
    })
    
    test("Button should not be disabled when input exists", ()=> {
        render(<MockLoginComponent/>)
        const emailInputEle = screen.getByPlaceholderText(/email address/i)
        const passInputEle = screen.getByPlaceholderText(/password/i)
        const buttonEle = screen.getByRole("button")
        const testValue = "test"
        fireEvent.change(emailInputEle, {target: {value: testValue}})
        fireEvent.change(passInputEle, {target: {value: testValue}})
        expect(buttonEle).not.toBeDisabled()
    })
    
    test("Loading should be visible when button is pressed", async ()=> {
        render(<MockLoginComponent/>)
        const emailInputEle = screen.getByPlaceholderText(/email address/i)
        const passInputEle = screen.getByPlaceholderText(/password/i)
        const buttonEle = screen.getByRole("button")
        const testValue = "test"
        fireEvent.change(emailInputEle, {target: {value: "jestink@live.com"}})
        fireEvent.change(passInputEle, {target: {value: testValue}})
        fireEvent.click(buttonEle);
        await waitFor(() => expect(buttonEle).toHaveTextContent(/loading/i))
    })

    test("Shows message after successfull login", async ()=> {
        render(<MockLoginComponent/>)
        const emailInputEle = screen.getByPlaceholderText(/email address/i)
        const passInputEle = screen.getByPlaceholderText(/password/i)
        const buttonEle = screen.getByRole("button")
        const testValue = "test"
        fireEvent.change(emailInputEle, {target: {value: "jestink@live.com"}})
        fireEvent.change(passInputEle, {target: {value: testValue}})
        fireEvent.click(buttonEle);
        const errorDiv = await screen.findByText(/you are signed in/i)
        expect(errorDiv).toBeInTheDocument()
    })

})



