npm install
npm run compile:dev
npm run publish:dev -- --token <secret>

shell.azure.com
az extension add --name azure-devops
az devops login --organization https://dev.azure.com/cc-demo-devops
az devops configure --defaults organization=https://dev.azure.com/cc-demo-devops
# dev with debug
az devops extension install --extension-id cosmo-o365-integration-dev --publisher-id tfenster      
# release without debug            
az devops extension install --extension-id cosmo-o365-integration --publisher-id tfenster                       

npm run start:dev 

https://github.com/microsoft/azure-devops-extension-sample
https://github.com/microsoft/azure-devops-extension-hot-reload-and-debug