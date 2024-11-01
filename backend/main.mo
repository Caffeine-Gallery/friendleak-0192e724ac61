import List "mo:base/List";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Hash "mo:base/Hash";

actor {
    // Stable variable to store users across upgrades
    private stable var users : [(Text, Text)] = [];
    
    // HashMap to store username and password
    private var userMap = HashMap.HashMap<Text, Text>(0, Text.equal, Text.hash);
    
    // Initialize the HashMap with stable data during upgrade
    system func preupgrade() {
        users := Iter.toArray(userMap.entries());
    };
    
    system func postupgrade() {
        userMap := HashMap.fromIter<Text, Text>(users.vals(), 0, Text.equal, Text.hash);
    };
    
    // Store username and password
    public func store(username: Text, password: Text) : async () {
        userMap.put(username, password);
    };
    
    // List all users and their passwords
    public query func list() : async [(Text, Text)] {
        return Iter.toArray(userMap.entries());
    };
}
