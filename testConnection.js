const mongoose = require('mongoose');

// Test connection function
const testConnection = async () => {
  try {
    // Note: The password contains @ symbol, so we need to encode it
    const username = 'evilsocket19';
    const password = encodeURIComponent('Deep@1234');
    const uri = `mongodb+srv://${username}:${password}@cluster0.6vrhzjn.mongodb.net/jss_ngo?retryWrites=true&w=majority&appName=Cluster0`;
    
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string:', uri);
    
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      name: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({
      name: 'Test Connection'
    });
    
    await testDoc.save();
    console.log('✅ Test document created successfully');
    
    // Clean up
    await TestModel.deleteOne({ name: 'Test Connection' });
    console.log('✅ Test document cleaned up');
    
    // Close connection
    await mongoose.connection.close();
    console.log('✅ Connection closed successfully');
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Run the test
testConnection(); 