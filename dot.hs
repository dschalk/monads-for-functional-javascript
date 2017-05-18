







add :: Int -> Int -> Int
add a b = a + b

mult :: Int -> Int
mult a = 3 * a

main = print $ (mult . add) 3 3 3
