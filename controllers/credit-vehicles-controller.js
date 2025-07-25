const CreditVehiclesDao = require("../dao/credit-vehicles-dao");  // Import the DAO for vehicles
const dateFormat = require('dateformat');  // Import dateFormat to format dates if needed
const db = require("../db/db-connection");  // Import db connection
const dbMapping = require("../db/ui-db-field-mapping");  // Import the field mappings if necessary

// Fetch vehicles for a specific credit party
exports.getVehiclesByCreditlist = async function (req, res, next) {
    try {
        const creditlistId = req.body.creditlist_id;  // Getting the credit party ID from request body
        const vehicles = await CreditVehiclesDao.findAll(creditlistId);

        console.log('=== VEHICLES REQUEST START ===');
     


        const vehiclesList = vehicles.map(vehicle => {
            return {
                vehicle_id: vehicle.vehicle_id,
                vehicle_number: vehicle.vehicle_number,
                vehicle_type: vehicle.vehicle_type || "N/A",  // Default to N/A if type is not provided
                created_by: vehicle.created_by,
                updated_by: vehicle.updated_by,
                creation_date: dateFormat(vehicle.creation_date, "yyyy-mm-dd"),
                updation_date: dateFormat(vehicle.updation_date, "yyyy-mm-dd")
            };
        });

        res.render('vehicles', {
            title: 'Vehicles List',
            user: req.user,
            vehicles: vehiclesList,
            creditlist_id: creditlistId
        });
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching vehicles",
            error: error.message
        });
    }
};

// Add a new vehicle to the credit party
// Save a single vehicle and render vehicles page
exports.saveVehicle = async function (req, res, next) {
    try {
        const creditlistId = req.body.creditlist_id;
        
        // Create the vehicle
        await CreditVehiclesDao.create(dbMapping.newVehicle(req));
        
        // Fetch updated vehicles list
        const vehicles = await CreditVehiclesDao.findAll(creditlistId);

        const vehiclesList = vehicles.map(vehicle => {
            return {
                vehicle_id: vehicle.vehicle_id,
                vehicle_number: vehicle.vehicle_number,
                vehicle_type: vehicle.vehicle_type || "N/A",
                created_by: vehicle.created_by,
                updated_by: vehicle.updated_by,
                creation_date: dateFormat(vehicle.creation_date, "yyyy-mm-dd"),
                updation_date: dateFormat(vehicle.updation_date, "yyyy-mm-dd")
            };
        });

        // Render the vehicles page with updated data
        res.render('vehicles', {
            title: 'Vehicles List',
            user: req.user,
            vehicles: vehiclesList,
            creditlist_id: creditlistId
        });
        
    } catch (error) {
        console.error('Error saving vehicle:', error);
        res.status(500).render('error', {
            message: 'Error saving vehicle',
            error: error
        });
    }
};
// Update a vehicle's information
exports.updateVehicle = async function (req, res, next) {
    try {
        const vehicleId = req.body.vehicle_id;  // Vehicle ID from request body
        const updatedData = req.body;  // Updated vehicle data from request body

        // Update the vehicle in the database
        await CreditVehiclesDao.update(vehicleId, updatedData);

        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully"
        });
    } catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(500).json({
            success: false,
            message: "Error updating vehicle",
            error: error.message
        });
    }
};

// Delete a vehicle from the credit party
exports.deleteVehicle = async function (req, res, next) {
    try {
        const vehicleId = req.body.vehicle_id;  // Vehicle ID from request body

        // Delete the vehicle from the database
        await CreditVehiclesDao.delete(vehicleId);

        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).json({
            success: false,
            message: "Error deleting vehicle",
            error: error.message
        });
    }
};

// Disable a vehicle (e.g., mark it as inactive or with an effective end date)
exports.disableVehicle = async function (req, res, next) {
    try {
        const vehicleId = req.body.vehicle_id;  // Vehicle ID from request body

        console.log('Disabling vehicle with ID:', vehicleId);

        // Disable the vehicle by updating its `effective_end_date`
        await CreditVehiclesDao.disableVehicle(vehicleId);

        res.status(200).json({
            success: true,
            message: "Vehicle disabled successfully"
        });
    } catch (error) {
        console.error('Error disabling vehicle:', error);
        res.status(500).json({
            success: false,
            message: "Error disabling vehicle",
            error: error.message
        });
    }
};

// Enable a vehicle (e.g., reset its effective end date)
exports.enableVehicle = async function (req, res, next) {
    try {
        const vehicleId = req.body.vehicle_id;  // Vehicle ID from request body

        // Enable the vehicle by resetting its `effective_end_date`
        await CreditVehiclesDao.enableVehicle(vehicleId);

        res.status(200).json({
            success: true,
            message: "Vehicle enabled successfully"
        });
    } catch (error) {
        console.error('Error enabling vehicle:', error);
        res.status(500).json({
            success: false,
            message: "Error enabling vehicle",
            error: error.message
        });
    }
};
