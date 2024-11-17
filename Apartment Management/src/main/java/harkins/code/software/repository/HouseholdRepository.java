package harkins.code.software.repository;

import harkins.code.software.models.household;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HouseholdRepository extends JpaRepository<household, Integer> {
    Optional<household> findByHouseholdNumber(String household_number);
}
