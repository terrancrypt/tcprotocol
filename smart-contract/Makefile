-include .env

fork-test:; forge test --fork-url $(SEPOLIA_RPC_URL) -vvvv

deploy:; forge script script/DeployEngine.s.sol:DeployEngine --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv

deploy-mock-token:; forge script script/DeployMockToken.s.sol:DeployMockToken --rpc-url $(OPT_GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(OPTIMISM_SCAN_API_KEY) -vvvv

deploy-polygon:; forge script script/DeployEngine.s.sol:DeployEngine --rpc-url $(POLYGON_MUMBAI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(POLYGON_SCAN_API_KEY) -vvvv

deploy-optimism:; forge script script/DeployEngine.s.sol:DeployEngine --rpc-url $(OPT_GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(OPTIMISM_SCAN_API_KEY) -vvvv