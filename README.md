Test only 
<!-- -- datil -->
TEST_TIMEOUT=100000000 NETWORK=datil yarn test:local --filter=testPkpSignXTimes

<!-- -- datil dev -->
const PARALLEL_RUNS = 100;
const TOTAL_RUNS = 10000;
const DELAY_BETWEEN_TESTS = 500; // 1.5 seconds in milliseconds

TEST_TIMEOUT=100000000 NETWORK=datil-dev yarn test:local --filter=testPkpSignXTimes

# Preview

bun run ana-server.ts

![](https://i.ibb.co/DV8pSby/Xnapper-2024-08-15-17-38-56.png)